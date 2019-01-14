const { mount } = require('@vue/test-utils');
const component = require('./markup.vue');

describe('LandingPage.vue', () => {
    it('should render correct contents', () => {
        const wrapper = mount(component);
        const title = wrapper.find('.center > h1');
        expect(wrapper.html()).toBe(true);
        // expect(title.textContent).toContain('Welcome to your new project!');
    });
});

