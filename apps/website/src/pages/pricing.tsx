import * as React from 'react'

import Script from 'next/script'

import { Box, CardHeader, SimpleGrid } from '@chakra-ui/react'
import {
  Heading,
  Text,
  HStack,
  VStack,
  Stack,
  useColorModeValue,
  Avatar,
  Tooltip,
  Card,
  CardBody,
} from '@chakra-ui/react'

import Section from '@/components/marketing/section-wrapper'
import SectionTitle from '@/components/marketing/section-title'

import SEO from '@/components/seo'
import { CheckIcon } from '@chakra-ui/icons'
import { ButtonLink } from '@/components/link'

import { Faq } from '@/components/faq'

import { Testimonials } from '@/components/testimonials'

import { BackgroundGradientRadial } from '@/components/background-gradient-radial'
import { Br } from '@saas-ui/react'

const PricingPage = () => {
  return (
    <Box>
      <SEO
        title="Saas UI"
        description="The React component library for Startups"
        titleTemplate="%s - Pricing"
      />
      <Script
        id="paritydeals-js"
        strategy="afterInteractive"
        src="https://cdn.paritydeals.com/banner.js"
      />
      <Script
        id="lemon-js"
        strategy="afterInteractive"
        src="https://app.lemonsqueezy.com/js/lemon.js"
        onLoad={() => {
          /* @ts-ignore */
          window.createLemonSqueezy?.()
        }}
      />
      <BackgroundGradientRadial
        top="-30%"
        bottom="auto"
        opacity="0.3"
        _dark={{ opacity: 0.5 }}
      />
      <Box mb={8} w="full" position="relative" overflow="hidden">
        <Pricing />

        <Faq />

        <Testimonials />
      </Box>
    </Box>
  )
}

const paymentLinks =
  process.env.NEXT_PUBLIC_PAYMENT === 'lemon'
    ? {
        bootstrap:
          'https://saas-ui.lemonsqueezy.com/checkout/buy/5c76854f-738a-46b8-b32d-932a97d477f5',
        startup:
          'https://saas-ui.lemonsqueezy.com/checkout/buy/bda4c7f4-e012-4956-96eb-e0efca6b91b0',
        className: 'lemonsqueezy-button',
      }
    : {
        bootstrap:
          'https://appulse.gumroad.com/l/saas-ui-pro-pre-order?variant=Single%20license',
        startup:
          'https://appulse.gumroad.com/l/saas-ui-pro-pre-order?variant=Unlimited%20license',
        className: 'gumroad-button',
      }

const Pricing = () => {
  React.useEffect(() => {
    if (process.env.NEXT_PUBLIC_PAYMENT === 'lemon') {
      /* @ts-ignore */
      window.createLemonSqueezy?.()
    }
  }, [])
  return (
    <Section id="pricing" pos="relative" innerWidth="container.xl">
      <Box zIndex="2" pos="relative">
        <SectionTitle
          title="Pricing for every stage"
          description={
            <Text fontSize="xl">
              Get started for free with 40+ open source components. Upgrade to
              Pro <Br display={{ sm: 'none', lg: 'inline' }} />
              to get all components and features with a license for you or your
              team.
            </Text>
          }
          py={{ base: '8', lg: '20' }}
        />

        <SimpleGrid columns={[1, null, 2, 4]} spacing={4}>
          <PricingBox
            title="Open Source"
            description="Basic components, perfect to get started."
            price="Free forever"
          >
            <PricingFeatures>
              <PricingFeature title="MIT License" />
              <PricingFeature title="Auth (Clerk/Supabase/Magic)" />
              <PricingFeature title="Forms manager" />
              <PricingFeature title="Modals manager" />
              <PricingFeature title="Stepper" />
              <PricingFeature title="Hotkeys" />
              <PricingFeature title="Web3 components" />
              <Text fontSize="sm">And much more...</Text>
            </PricingFeatures>
            <ButtonLink href="/docs" variant="outline" mt="10">
              View documentation
            </ButtonLink>
          </PricingBox>
          <PricingBox
            title="Bootstrap"
            price={
              <HStack>
                <Text>€199,-</Text>
              </HStack>
            }
            description="Complete frontend stack for bootstrappers and small teams."
            highlight="primary.500"
          >
            <PricingFeatures>
              <PricingFeature
                title="One developer"
                help="One developer per license, you can buy as many licenses as you need. Licenses can be transfered."
              />
              <PricingFeature
                title={<>Unlimited projects*</>}
                help="You can build and fail as many self hosted SaaS products as you like. Maximum 1 client project per license."
              />
              <PricingFeature title="Advanced components" />
              <PricingFeature title="Multiple themes" />
              <PricingFeature title="Next.js and Electron boilerplates" />
              <PricingFeature title="Private discord community" />
              <PricingFeature title="1 year of updates" />
              <br />
              <PricingFeature
                title="Private beta access"
                iconColor="green.500"
              />
            </PricingFeatures>
            <ButtonLink
              as="a"
              colorScheme="primary"
              href={paymentLinks.bootstrap}
              className={paymentLinks.className}
              onClick={(e) => {
                setTimeout(() => {
                  /* @ts-ignore */
                  window?.pirsch?.('Order Bootstrap')
                })
              }}
            >
              Early access
            </ButtonLink>
          </PricingBox>
          <PricingBox
            title="Startup"
            price={
              <HStack>
                <Text
                  textDecoration="line-through"
                  fontSize="sm"
                  color="gray.400"
                >
                  €999,-
                </Text>
                <Text>€699,-</Text>
              </HStack>
            }
            description="Unlimited license for growing teams or agencies."
          >
            <PricingFeatures>
              <PricingFeature
                title="Up to 20 developers"
                help="A developer can be either an employee or a contracted freelancer."
              />
              <PricingFeature
                title="Unlimited projects"
                help="No restrictions on commercial projects or client work."
              />
              <PricingFeature title="Everything from Bootstrap" />
              <PricingFeature title="Prioritized feature requests" />
              <PricingFeature title="Priority support" />
              <PricingFeature title="Introduction call" />
              <PricingFeature title="1 year of updates" />
              <br />
              <PricingFeature
                title="Private beta access"
                iconColor="green.500"
              />
            </PricingFeatures>
            <ButtonLink
              as="a"
              colorScheme="primary"
              href={paymentLinks.startup}
              className={paymentLinks.className}
              onClick={(e) => {
                setTimeout(() => {
                  /* @ts-ignore */
                  window?.pirsch?.('Order Startup')
                })
              }}
            >
              Early access
            </ButtonLink>
          </PricingBox>
          <MemberShip />
        </SimpleGrid>

        <Text
          p="8"
          textAlign="center"
          color={useColorModeValue('gray.500', 'gray.400')}
        >
          VAT may be applicable depending on your location.
        </Text>
      </Box>
    </Section>
  )
}

const PricingFeatures = ({ children }) => {
  return (
    <VStack
      align="stretch"
      justifyContent="stretch"
      spacing="4"
      mb="8"
      flex="1"
    >
      {children}
    </VStack>
  )
}

const PricingFeature = ({ title, iconColor = 'primary.500', help = '' }) => {
  return (
    <HStack>
      <CheckIcon color={iconColor} />{' '}
      <Tooltip label={help}>
        <Text flex="1" fontSize="sm" cursor="default">
          <Text
            as="span"
            borderStyle="dotted"
            borderBottomWidth={help ? '1px' : 'none'}
            borderColor="currentColor"
          >
            {title}
          </Text>
        </Text>
      </Tooltip>
    </HStack>
  )
}

const PricingBox = ({
  title,
  description,
  price,
  highlight = undefined,
  children,
  ...props
}) => {
  return (
    <VStack
      zIndex="2"
      backdropFilter="blur(100px)"
      transform="translate3d(0, 0, 0)"
      borderRadius="lg"
      p="8"
      flex="1 0"
      alignItems="stretch"
      position="relative"
      _before={{
        content: '""',
        display: 'block',
        pointerEvents: 'none',
        userSelect: 'none',
        position: 'absolute',
        inset: '0px',
        borderRadius: 'inherit',
        padding: '1px',
        bgGradient: highlight
          ? `linear(to-b, ${highlight}, transparent)`
          : 'linear(to-b, blackAlpha.200, transparent)',
        mask: 'linear-gradient(black, black) content-box content-box, linear-gradient(black, black)',
        maskComposite: 'exclude',
        WebkitMaskComposite: 'xor',
      }}
      _dark={{
        _before: {
          bgGradient: highlight
            ? `linear(to-b, ${highlight}, transparent)`
            : 'linear(to-b, whiteAlpha.300, transparent)',
        },
      }}
      {...props}
    >
      <Heading as="h3" size="md" fontWeight="bold" fontSize="lg" mb="2">
        {title}
      </Heading>
      <Box color={useColorModeValue('gray.500', 'gray.400')} fontSize="md">
        {description}
      </Box>
      <Box fontSize="2xl" fontWeight="bold" py="4">
        {price}
      </Box>
      <VStack align="stretch" justifyContent="stretch" spacing="4" flex="1">
        {children}
      </VStack>
    </VStack>
  )
}

const MemberShip = () => {
  return (
    <PricingBox
      title={
        <HStack>
          <Text>Membership</Text>
        </HStack>
      }
      description="Limited access membership for teams that want to get moving fast."
      price={
        <Stack spacing="0">
          <Text fontSize="sm" color="gray.400" fontWeight="medium">
            Starting at
          </Text>
          <HStack>
            <Text>€2000,-</Text>
            <Text fontSize="sm" color="gray.400">
              / month
            </Text>
          </HStack>
        </Stack>
      }
    >
      <PricingFeatures>
        <PricingFeature
          title="Custom component development"
          iconColor="cyan.500"
        />
        <PricingFeature title="Help with implementation" iconColor="cyan.500" />
        <PricingFeature title="Project setup" iconColor="cyan.500" />
        <PricingFeature title="Hands-on support" iconColor="cyan.500" />
      </PricingFeatures>
      <ButtonLink
        href="mailto:hello@saas-ui.dev?subject=Membership"
        colorScheme="cyan"
        onClick={() => {
          setTimeout(() => {
            /* @ts-ignore */
            window?.pirsch?.('Membership')
          })
        }}
      >
        Get in touch
      </ButtonLink>
    </PricingBox>
  )
}

const HighlightBox = (props) => {
  const { children, ...rest } = props
  return (
    <VStack
      bgColor={useColorModeValue('gray.100', 'gray.800')}
      borderRadius="md"
      p="8"
      flex="1 0"
      alignItems="flex-start"
      spacing="8"
      overflow="hidden"
      position="relative"
      {...rest}
    >
      {children}
    </VStack>
  )
}

const Testimonial = ({ name, description, avatar, children, ...rest }) => {
  return (
    <Card {...rest}>
      <CardHeader>
        <Avatar name="Tien Tienth" src={avatar} />
        <Stack>
          <Heading size="sm">{name}</Heading>
          <Text color="muted" size="md">
            {description}
          </Text>
        </Stack>
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  )
}

export default PricingPage

export async function getStaticProps() {
  return {
    props: {
      header: {
        position: 'fixed',
        variant: 'dark',
      },
    },
  }
}
