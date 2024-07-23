import { mount } from '@vue/test-utils';
import HomeView from '../views/HomeView.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useMovieStore } from '../stores';

describe('HomeView.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders movie cards and supports filtering and sorting', async () => {
    const store = useMovieStore();
    store.movies = [
      { id: 1, title: 'Movie A', year: 2020, genre: 'Action', rating: 8, description: '', imageUrl: '' },
      { id: 2, title: 'Movie B', year: 2021, genre: 'Comedy', rating: 7, description: '', imageUrl: '' },
    ];
    store.filter = 'Movie A';
    store.sortBy = 'year';
    store.sortOrder = 'asc';

    const wrapper = mount(HomeView);

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('Movie A');
    expect(wrapper.text()).not.toContain('Movie B');
  });
});
