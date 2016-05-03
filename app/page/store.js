import uuid from 'node-uuid';
const pages = [
  {
    title: '<span class="em">People</span> ignore design that ignores <span class="em">people</span>',
    image: require('../images/info1.jpg'),
    id: '1',
    order: 1
  },
  {
    paragraph: "It's natural to think that living things must be the handiwork of a designer. But it was also natural to think that the sun went around the earth. Overcoming naive impressions to figure out how things really work is one of humanity's highest callings.",
    image: require('../images/info2.jpg'),
    id: '2',
    order: 2
  },
  {
    widgets: [
      {
        type: 'fact',
        number: 9,
        title: 'years of experience',
        description: "Design can be art. Design can be aesthetics. Design is so simple, that's why it is so complicated.",
        align: 'right',
        id: uuid.v4()
      },
      {
        type: 'fact',
        number: 23,
        title: 'successful projects',
        description: "Design can be art. Design can be aesthetics. Design is so simple, that's why it is so complicated.",
        align: 'left',
        id: uuid.v4()
      }
    ],
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
      nextIndex: (((i + 1) < pages.length) ? i + 1 : null),
      prevIndex: (((i - 1) >= 0) ? i - 1 : null)
    };
    return {
      next: nextIndex !== null ? pages[nextIndex].id : null,
      prev: prevIndex !== null ? pages[prevIndex].id : null
    };
  }
}

export default PageStore;
