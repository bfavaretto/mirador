import {
  getAllOrSelectedAnnotationsOnCanvases,
  getAnnotationResourcesByMotivation,
  getLanguagesFromConfigWithCurrent,
  getSelectedAnnotationIds,
} from '../../../src/state/selectors';
import Annotation from '../../../src/lib/Annotation';

describe('getAnnotationResourcesByMotivation', () => {
  const annotations = [
    new Annotation({ resources: [{ motivation: 'oa:commenting' }] }),
    new Annotation({ resources: [{ motivation: 'oa:not-commenting' }] }),
    new Annotation({ resources: [{ motivation: ['sc:something-else', 'oa:commenting'] }] }),
  ];

  it('returns an array of annotation resources (filtered by the passed in array of motiviations)', () => {
    const expected = [
      ['oa:commenting'],
      ['sc:something-else', 'oa:commenting'],
    ];

    expect(
      getAnnotationResourcesByMotivation(annotations, ['something', 'oa:commenting']).map(r => r.motivations),
    ).toEqual(expected);
  });
});

describe('getLanguagesFromConfigWithCurrent', () => {
  it('returns an array of objects with locale, label, and current properties', () => {
    const state = {
      config: { language: 'epo', availableLanguages: { epo: 'Esparanto', tlh: 'Klingon' } },
    };

    const expected = [
      { locale: 'epo', label: 'Esparanto', current: true },
      { locale: 'tlh', label: 'Klingon', current: false },
    ];

    expect(getLanguagesFromConfigWithCurrent(state)).toEqual(expected);
  });
});

it('getSelectedAnnotationIds returns an array of selected annotation IDs from state', () => {
  const state = {
    windows: {
      wid: {
        selectedAnnotations: {
          tid1: ['aid1', 'aid2'],
          tid2: ['aid3'],
        },
      },
    },
  };

  expect(getSelectedAnnotationIds(state, { windowId: 'wid', targetIds: ['tid2'] })).toEqual(
    ['aid3'],
  );
  expect(getSelectedAnnotationIds(state, { windowId: 'wid', targetIds: ['tid1', 'tid2'] })).toEqual(
    ['aid1', 'aid2', 'aid3'],
  );
});

describe('getAllOrSelectedAnnotationsOnCanvases', () => {
  it('returns all annotations if the given window is set to display all', () => {
    const state = {
      windows: {
        abc123: { displayAllAnnotations: true },
      },
      annotations: {
        cid1: {
          annoId1: { id: 'annoId1', json: { resources: [{ '@id': 'annoId1' }, { '@id': 'annoId2' }] } },
        },
      },
    };

    expect(
      getAllOrSelectedAnnotationsOnCanvases(state, { windowId: 'abc123', targetIds: ['cid1'] })[0].resources.length,
    ).toBe(2);
  });

  it('returns only selected annotations if the window is not set to display all', () => {
    const state = {
      windows: {
        abc123: { displayAllAnnotations: false },
      },
      annotations: {
        cid1: {
          annoId1: { id: 'annoId1', json: { resources: [{ '@id': 'annoId1' }, { '@id': 'annoId2' }] } },
        },
      },
    };

    expect(
      getAllOrSelectedAnnotationsOnCanvases(state, { windowId: 'abc123', targetIds: ['cid1'] })[0].resources.length,
    ).toBe(1);
  });

  it('filters the annotation resources by the selected annotations for the window', () => {
    const state = {
      annotations: {
        windows: {
          abc123: { selectedAnnotations: { cid1: ['annoId2'] } },
        },
        cid1: {
          annoId1: { id: 'annoId1', json: { resources: [{ '@id': 'annoId2' }, { '@id': 'annoId3' }] } },
        },
      },
    };

    expect(
      getAllOrSelectedAnnotationsOnCanvases(state, { windowId: 'abc123', targetIds: ['cid1'] })[0].resources.length,
    ).toBe(1);
  });
});
