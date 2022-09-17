import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import {
  Badge,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react'

import { FiHome, FiUsers, FiSettings, FiHash, FiStar } from 'react-icons/fi'

import { FaHome, FaUsers, FaCog, FaHashtag } from 'react-icons/fa'

import {
  Sidebar,
  SidebarProps,
  Nav,
  NavGroup,
  NavItem,
  SidebarSection,
  SidebarToggleButton,
  SidebarOverlay,
} from '../src'
import { MenuItem, PersonaAvatar } from '@saas-ui/react'

import { Logo } from './saas-ui'

export default {
  title: 'Components/Layout/Sidebar',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <HStack
        height="100vh"
        width="100vw"
        justifyItems="stretch"
        alignItems="stretch"
      >
        <Story />
      </HStack>
    ),
  ],
} as Meta

const Template: Story<SidebarProps> = (args) => <Sidebar {...args} />

export const Basic = Template.bind({})
Basic.args = {}

export const WithLinks = Template.bind({})
WithLinks.args = {
  children: (
    <>
      <SidebarToggleButton />
      <SidebarSection flex="1" overflowY="auto">
        <NavItem label="Home" />
        <NavItem label="Users" />
        <NavItem label="Settings" />
      </SidebarSection>
    </>
  ),
}

export const WithFeatherIcons = Template.bind({})
WithFeatherIcons.args = {
  children: (
    <>
      <SidebarToggleButton />
      <SidebarSection flex="1" overflowY="auto">
        <NavItem label="Home" icon={<FiHome />} />
        <NavItem label="Users" icon={<FiUsers />} />
        <NavItem label="Settings" icon={<FiSettings />} />
      </SidebarSection>
    </>
  ),
}

export const WithFaIcons = Template.bind({})
WithFaIcons.args = {
  children: (
    <>
      <SidebarToggleButton />
      <SidebarSection flex="1" overflowY="auto">
        <NavItem label="Home" icon={<FaHome />} />
        <NavItem label="Users" icon={<FaUsers />} />
        <NavItem label="Settings" icon={<FaCog />} />
      </SidebarSection>
    </>
  ),
}

export const WithHorizontalNav = Template.bind({})
WithHorizontalNav.args = {
  children: (
    <>
      <SidebarToggleButton />
      <SidebarSection ps="6" pe="4" direction="row">
        <Logo width="24px" />
        <Spacer />
        <Menu>
          <MenuButton as={IconButton} variant="ghost">
            <PersonaAvatar presence="online" size="xs" />
          </MenuButton>
          <MenuList>
            <MenuItem>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </SidebarSection>
      <SidebarSection flex="1" overflowY="auto">
        <NavItem label="Home" icon={<FiHome />} />
        <NavItem label="Users" icon={<FiUsers />} />
        <NavItem label="Settings" icon={<FiSettings />} />
      </SidebarSection>
    </>
  ),
}

export const WithCollapsibleGroup = Template.bind({})
WithCollapsibleGroup.args = {
  children: (
    <>
      <SidebarToggleButton />
      <SidebarSection ps="6" pe="4" direction="row">
        <Logo width="24px" />
        <Spacer />
        <Menu>
          <MenuButton as={IconButton} variant="ghost">
            <PersonaAvatar presence="online" size="xs" />
          </MenuButton>
          <MenuList>
            <MenuItem>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </SidebarSection>
      <SidebarSection flex="1" overflowY="auto">
        <NavGroup>
          <NavItem label="Home" icon={<FiHome />} isActive />
          <NavItem label="Users" icon={<FiUsers />} />
          <NavItem label="Settings" icon={<FiSettings />} />
        </NavGroup>

        <NavGroup title="Tags" isCollapsible>
          <NavItem label="Design system" icon={<FiHash />} />
          <NavItem label="Framework" icon={<FiHash />} />
          <NavItem label="Chakra UI" inset={5} icon={<FiHash />} />
          <NavItem label="React" inset={5} icon={<FiHash />} />
        </NavGroup>
      </SidebarSection>
    </>
  ),
}

const NavItemBadge = (props) => (
  <Badge bg="whiteAlpha.200" fontWeight="normal" rounded="md" {...props} />
)

export const WithBadge = Template.bind({})
WithBadge.args = {
  children: (
    <>
      <SidebarToggleButton />
      <SidebarSection ps="6" pe="4" direction="row">
        <Logo width="24px" />
        <Spacer />
        <Menu>
          <MenuButton as={IconButton} variant="ghost">
            <PersonaAvatar presence="online" size="xs" />
          </MenuButton>
          <MenuList>
            <MenuItem>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </SidebarSection>
      <SidebarSection flex="1" overflowY="auto">
        <NavGroup>
          <NavItem label="Home" icon={<FiHome />} isActive />
          <NavItem label="Users" icon={<FiUsers />} />
          <NavItem label="Settings" icon={<FiSettings />} />
        </NavGroup>

        <NavGroup title="Tags" isCollapsible>
          <NavItem label="Design system" icon={<FiHash />}>
            <NavItemBadge>1</NavItemBadge>
          </NavItem>
          <NavItem label="Framework" icon={<FiHash />} />
          <NavItem label="Chakra UI" inset={5} icon={<FiHash />}>
            <NavItemBadge>32</NavItemBadge>
          </NavItem>
          <NavItem label="React" inset={5} icon={<FiHash />}>
            <NavItemBadge>100</NavItemBadge>
          </NavItem>
        </NavGroup>
      </SidebarSection>
    </>
  ),
}

export const WithSubtleLinks = Template.bind({})
WithSubtleLinks.args = {
  children: (
    <>
      <SidebarToggleButton />
      <SidebarSection ps="6" pe="4" direction="row">
        <Logo width="24px" />
        <Spacer />
        <Menu>
          <MenuButton as={IconButton} variant="ghost">
            <PersonaAvatar presence="online" size="xs" />
          </MenuButton>
          <MenuList>
            <MenuItem>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </SidebarSection>
      <SidebarSection flex="1" overflowY="auto">
        <NavGroup>
          <NavItem label="Home" variant="subtle" icon={<FiHome />} isActive />
          <NavItem label="Users" variant="subtle" icon={<FiUsers />} />
          <NavItem label="Settings" variant="subtle" icon={<FiSettings />} />
        </NavGroup>

        <NavGroup title="Tags" isCollapsible>
          <NavItem label="Design system" icon={<FiHash />} />
          <NavItem label="Framework" icon={<FiHash />} />
          <NavItem label="Chakra UI" inset={5} icon={<FiHash />} />
          <NavItem label="React" inset={5} icon={<FiHash />} />
        </NavGroup>
      </SidebarSection>
    </>
  ),
}

export const WithSolidLinks = Template.bind({})
WithSolidLinks.args = {
  children: (
    <>
      <SidebarToggleButton />
      <SidebarSection ps="6" pe="4" direction="row">
        <Logo width="24px" />
        <Spacer />
        <Menu>
          <MenuButton as={IconButton} variant="ghost">
            <PersonaAvatar presence="online" size="xs" />
          </MenuButton>
          <MenuList>
            <MenuItem>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </SidebarSection>
      <SidebarSection flex="1" overflowY="auto">
        <NavGroup>
          <NavItem label="Home" variant="solid" icon={<FiHome />} isActive />
          <NavItem label="Users" variant="solid" icon={<FiUsers />} />
          <NavItem label="Settings" variant="solid" icon={<FiSettings />} />
        </NavGroup>

        <NavGroup title="Tags" isCollapsible>
          <NavItem label="Design system" icon={<FiHash />} />
          <NavItem label="Framework" icon={<FiHash />} />
          <NavItem label="Chakra UI" inset={5} icon={<FiHash />} />
          <NavItem label="React" inset={5} icon={<FiHash />} />
        </NavGroup>
      </SidebarSection>
    </>
  ),
}

export const VariantCondensed = Template.bind({})
VariantCondensed.args = {
  variant: 'condensed',
  children: (
    <>
      <Nav>
        <Logo width="24px" color="primary.500" />
      </Nav>
      <Nav>
        <NavItem
          label="Home"
          icon={<FiHome size="1.2em" />}
          size="md"
          isActive
        />
        <NavItem label="Users" icon={<FiUsers size="1.2em" />} size="md" />
        <NavItem
          label="Settings"
          icon={<FiSettings size="1.2em" />}
          size="md"
        />
      </Nav>
    </>
  ),
}

export const VariantCondensedColor = Template.bind({})
VariantCondensedColor.args = {
  variant: 'condensed',
  colorScheme: 'purple',
  children: (
    <>
      <Logo width="24px" color="white" />
      <NavGroup>
        <NavItem
          label="Home"
          icon={<FiHome size="1.2em" color="white" />}
          size="md"
          isActive
        />
        <NavItem
          label="Users"
          icon={<FiUsers size="1.2em" color="white" />}
          size="md"
        />
        <NavItem
          label="Settings"
          icon={<FiSettings size="1.2em" color="white" />}
          size="md"
        />
      </NavGroup>
    </>
  ),
}

export const DoubleSidebar = () => {
  const disclosure = useDisclosure()

  return (
    <Flex alignItems="stretch" overflow="hidden">
      <Sidebar
        variant="condensed"
        colorScheme="purple"
        border="0"
        zIndex="3"
        position="relative"
      >
        <Logo width="24px" color="white" />

        <NavGroup>
          <NavItem
            label="Users"
            icon={<FiUsers size="1.2em" color="white" />}
            size="md"
            isActive
            onClick={(e) => {
              e.preventDefault()
              disclosure.onToggle()
            }}
          />
          <NavItem
            label="Settings"
            icon={<FiSettings size="1.2em" color="white" />}
            size="md"
            onClick={(e) => {
              e.preventDefault()
              disclosure.onClose()
            }}
          />
        </NavGroup>

        <Spacer />

        <Menu>
          <MenuButton as={Button} variant="ghost">
            <PersonaAvatar presence="online" size="xs" />
          </MenuButton>
          <MenuList>
            <MenuItem>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </Sidebar>
      <Sidebar
        isOpen={disclosure.isOpen}
        onClose={disclosure.onClose}
        onOpen={disclosure.onOpen}
        zIndex={2}
        marginLeft={[16, 0]}
      >
        <SidebarSection ps="6" pe="4" direction="row">
          <Heading size="sm" py="2">
            Users
          </Heading>
          <Spacer />
        </SidebarSection>

        <SidebarSection flex="1" overflowY="auto">
          <NavGroup>
            <NavItem label="All users" icon={<FiHome />} isActive />
            <NavItem label="Favourite users" icon={<FiStar />} />
          </NavGroup>
          <NavGroup title="Tags" isCollapsible>
            <NavItem label="Design system" icon={<FiHash />} />
            <NavItem label="Framework" icon={<FiHash />} />
            <NavItem label="Chakra UI" inset={5} icon={<FiHash />} />
            <NavItem label="React" inset={5} icon={<FiHash />} />
          </NavGroup>
        </SidebarSection>
        <SidebarOverlay zIndex="1" />
      </Sidebar>
    </Flex>
  )
}
