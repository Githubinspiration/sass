import {
  IconButton,
  ButtonProps,
  Tooltip,
  useClipboard,
} from '@chakra-ui/react'
import React from 'react'

import { CopyIcon, CheckIcon } from '@chakra-ui/icons'

interface CopyButtonProps extends ButtonProps {
  code: string
}

function CopyButton({ code, ...props }: CopyButtonProps) {
  const { hasCopied, onCopy } = useClipboard(code)

  const label = hasCopied ? 'Copied' : 'Copy'

  return (
    <Tooltip label={label}>
      <IconButton
        size="sm"
        position="absolute"
        color="white"
        fontSize="sm"
        height="24px"
        top={0}
        zIndex="1"
        right="1.25em"
        variant="ghost"
        _hover={{ bg: 'none' }}
        {...props}
        aria-label="copy"
        onClick={onCopy}
      >
        {hasCopied ? <CheckIcon /> : <CopyIcon />}
      </IconButton>
    </Tooltip>
  )
}

export default CopyButton
