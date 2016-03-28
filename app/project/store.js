const projects = [
  {
    title: 'Now that we gone where you are',
    description: 'Open plan spaces address the large mature garden, a double height' +
    ' space floods the core of the building with natural light and the' +
    ' old first floor balconies take advantage of the grounds and the' +
    ' fields beyond.',
    image: require('../images/sample_interior.jpg'),
    id: '1',
    order: 1
  },
  {
    title: 'English, do you speak it?',
    description: 'Open plan spaces address the large mature garden, a double height' +
    ' space floods the core of the building with natural light and the' +
    ' new second floor balconies take advantage of the grounds and the' +
    ' fields above.',
    image: require('../images/interior2.jpg'),
    id: '2',
    order: 2
  },
  {
    title: 'Lego creations re-imagine',
    description: 'Bringing a mixed-use project into this financial district will not only enliven the area during daytime, but it will also introduce evening programs and create an essential form of social sustainability to this part of the city.',
    image: require('../images/interior3.jpg'),
    id: '3',
    order: 3
  }
];

class ProjectStore {
  static findAll() {
    return projects;
  }

  static findById(id) {
    return projects.find((project) => project.id === id);
  }

  static first() {
    return projects[0];
  }

  static findNeighbours(id) {
    const i = projects.findIndex((project) => project.id === id);
    const { nextIndex, prevIndex } = {
      nextIndex: (((i + 1) < projects.length) ? i + 1 : 0),
      prevIndex: (((i - 1) >= 0) ? i - 1 : projects.length - 1)
    };
    return {
      next: projects[nextIndex].id,
      prev: projects[prevIndex].id
    };
  }
}

export default ProjectStore;
