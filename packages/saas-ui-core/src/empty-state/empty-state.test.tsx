import * as React from 'react'

import { render, testStories } from '@saas-ui/test-utils'
import * as stories from './empty-state.stories'

testStories<typeof stories>(stories)
