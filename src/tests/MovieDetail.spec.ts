import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import MovieDetail from '../views/MovieDetailView.vue';
import { useMovieStore } from '../stores';

jest.mock('vue-router', () => ({
  useRoute: jest.fn(),
  useRouter: jest.fn()
}));

describe('MovieDetail.vue', () => {
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
      params: { id: '1' },
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

    jest.spyOn(storeMock, 'deleteMovie')
  });

  it('renders movie details', async () => {
    const wrapper = mount(MovieDetail);

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('Inception');
    expect(wrapper.text()).toContain('Release year: 2010');
    expect(wrapper.text()).toContain('Film genre: Sci-Fi');
    expect(wrapper.text()).toContain('Rating: 8.8');
    expect(wrapper.text()).toContain('A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.');
  });

  it('navigates to edit page on edit button click', async () => {
    const wrapper = mount(MovieDetail);

    await wrapper.vm.$nextTick();

    const editButton = wrapper.find('.actions .button');
    await editButton.trigger('click');

    expect(editButton.attributes('to')).toBe('/edit/1');
  });

  it('calls store delete method and navigates to home on delete button click', async () => {
    window.confirm = jest.fn(() => true);

    const wrapper = mount(MovieDetail);

    await wrapper.vm.$nextTick();

    const deleteButton = wrapper.find('.button.button-red');
    await deleteButton.trigger('click');

    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this movie?');
    expect(storeMock.deleteMovie).toHaveBeenCalledWith(1);
    expect(routerMock.push).toHaveBeenCalledWith('/');
  });
});
