import { mount } from '@vue/test-utils';
import AddEditMovieView from '../views/AddEditMovieView.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { useMovieStore } from '../stores';

jest.mock('vue-router', () => ({
    useRoute: jest.fn(),
    useRouter: jest.fn()
  }));

describe('AddEditMovieView.vue', () => {
    let routerMock: any;
    let storeMock: any;

    beforeEach(() => {
        setActivePinia(createPinia());

        routerMock = {
            push: jest.fn(),
            replace: jest.fn(),
            go: jest.fn(),
            back: jest.fn(),
            forward: jest.fn()
        };

        (useRouter as jest.Mock).mockReturnValue(routerMock);

        (useRoute as jest.Mock).mockReturnValue({
            params: {},
            query: {},
            hash: '',
            fullPath: '',
            path: '',
            name: ''
        });

        storeMock = useMovieStore()

        storeMock.movies = [
            {
                id: 1,
                title: 'Inception',
                year: 2010,
                genre: 'Sci-Fi',
                rating: 8.8,
                description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
                imageUrl: 'path/to/image.jpg'
            }
        ]
    })

    it('renders the form correctly', async () => {
        const wrapper = mount(AddEditMovieView);

        await wrapper.vm.$nextTick();

        expect(wrapper.find('h1').text()).toBe('Add Movie');
        expect(wrapper.findAll('input').length).toBe(5);
        expect(wrapper.find('textarea').exists()).toBe(true);
        expect(wrapper.find('button').text()).toBe('Add Movie');
    });

    it('validates the form inputs', async () => {
        const wrapper = mount(AddEditMovieView);
    
        await wrapper.find('form').trigger('submit.prevent');

        await wrapper.vm.$nextTick();

        expect(wrapper.find('.error').exists()).toBe(true);
        expect(wrapper.find('.error').text()).toBe('All fields are required');
    
        await wrapper.find('#title').setValue('Test Movie');
        await wrapper.find('#year').setValue(1899);
        await wrapper.find('#genre').setValue('Action');
        await wrapper.find('#description').setValue('A great movie');
        await wrapper.find('#image').setValue('http://example.com/image.jpg');
    
        await wrapper.find('form').trigger('submit.prevent');

        await wrapper.vm.$nextTick();
        
        expect(wrapper.find('.error').exists()).toBe(true);
        expect(wrapper.find('.error').text()).toBe('Year must be between 1900 and the current year');
    });

    it('loads an existing movie in edit mode', async () => {
        (useRoute as jest.Mock).mockReturnValue({
          params: { id: '1' },
          query: {},
          hash: '',
          fullPath: '',
          path: '',
          name: ''
        });
    
        const wrapper = mount(AddEditMovieView);
    
        await wrapper.vm.$nextTick();
    
        expect(wrapper.find('#title').element.value).toBe('Inception');
        expect(wrapper.find('#year').element.value).toBe('2010');
        expect(wrapper.find('#genre').element.value).toBe('Sci-Fi');
      });
})