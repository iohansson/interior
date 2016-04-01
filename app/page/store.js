const pages = [
  {
    title: 'People ignore design that ignores people',
    id: '1',
    order: 1
  },
  {
    title: 'English, do you speak it?',
    id: '2',
    order: 2
  },
  {
    title: 'Lego creations re-imagine',
    id: '3',
    order: 3
  }
];

class PageStore {
  static findAll() {
    return pages;
  }

  static findById(id) {
    return pages.find((page) => page.id === id);
  }

  static first() {
    return pages[0];
  }

  static isLast(id) {
    return pages[pages.length - 1].id === id;
  }

  static isFirst(id) {
    return pages[0] && pages[0].id === id;
  }

  static findNeighbours(id) {
    const i = pages.findIndex((page) => page.id === id);
    const { nextIndex, prevIndex } = {
      nextIndex: (((i + 1) < pages.length) ? i + 1 : 0),
      prevIndex: (((i - 1) >= 0) ? i - 1 : pages.length - 1)
    };
    return {
      next: pages[nextIndex].id,
      prev: pages[prevIndex].id
    };
  }
}

export default PageStore;
