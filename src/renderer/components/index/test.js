const Vue  = require('vue');
const component = require('./markup.vue');

describe('LandingPage.vue', () => {
    it('should render correct contents', () => {
        const vm = new Vue({
            el: document.createElement('div'),
            render: h => h(component)
        }).$mount();

        expect(vm.$el.querySelector('.title').textContent).to.contain('Welcome to your new project!');
    });
});
