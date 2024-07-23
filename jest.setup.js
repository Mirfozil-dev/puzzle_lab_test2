import { config } from '@vue/test-utils';
import { nextTick } from 'vue';

config.global.mocks = {
  $nextTick: async () => await new Promise(resolve => setImmediate(resolve))
};


config.global.components = {
  'router-link': {
    template: '<a><slot /></a>'
  },
  'router-view': {
    template: '<div></div>'
  }
};

const mockRoute = {
  params: {},
  query: {},
  hash: '',
  fullPath: '',
  path: '',
  name: ''
};

const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  go: jest.fn(),
  back: jest.fn(),
  forward: jest.fn()
};

config.global.provide = {
  route: mockRoute,
  router: mockRouter
};

config.global.mocks = {
  $nextTick: nextTick
};