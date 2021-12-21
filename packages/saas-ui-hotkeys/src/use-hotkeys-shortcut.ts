import { useHotkeysContext } from './provider'
import { useHotkeys } from './use-hotkeys'

/**
 * useHotkeysShortcut React Hook
 *
 * Accepts one key combination or a shortcut
 *
 * Shortcuts refer to a predefined hotkeys configuration.
 * More info see:
 * @type Hotkeys
 *
 * For example:
 * ctrl+f or general.search
 *
 * @param keyOrShortcut Key combinations or a hotkeys shortcut
 * @param callback The function to execute when the keys are pressed
 * @param deps Deps for the callback function
 * @returns The key combination
 */
export const useHotkeysShortcut = (
  keyOrShortcut: string,
  callback: (event: KeyboardEvent) => void,
  deps: Array<any> = [],
): string => {
  const { hotkeys } = useHotkeysContext()

  const [group, key] = keyOrShortcut.split('.')

  let keys
  if (group && key) {
    keys = hotkeys[group]?.hotkeys[key]?.command
  }

  if (!keys) {
    keys = keyOrShortcut
  }

  useHotkeys(keys, callback, deps)

  return keys
}
