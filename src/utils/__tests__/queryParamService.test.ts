import { queryParamService } from '../queryParamService';

/* setup to be able to mutate window.location.search in JSDOM */
const location = {
    ...window.location,
    search: '?searchFilter=CH',
};
Object.defineProperty(window, 'location', {
    writable: true,
    value: location,
});

describe('queryParamService', () => {
    describe('parsing', () => {
        it('returns queryParams with an empty object when there are no query params', () => {
            window.location.search = '';

            const { queryParams } = queryParamService();

            expect(queryParams).toEqual({});
        });

        it('returns queryParams as a key value object of the query params in the url', () => {
            window.location.search = 'filter=hi&sort=population%2Basc';

            const { queryParams } = queryParamService<{ filter: string; sort: string }>();

            expect(queryParams).toEqual({ filter: 'hi', sort: 'population+asc' });
        });
    });

    describe('setting', () => {
        it('returns setQueryParams which can modify the query param', () => {
            const pushStateSpy = jest.fn();
            window.history.pushState = pushStateSpy;
            const { setQueryParams } = queryParamService<{ filter: string }>();

            setQueryParams({ filter: 'wot' });

            expect(pushStateSpy).toHaveBeenCalledWith({}, '', 'http://localhost/?filter=wot');
        });

        it('returns setQueryParams which can delete the query param when the value is set as undefined or null', () => {
            window.location.search = '?filter=hi';
            const pushStateSpy = jest.fn();
            window.history.pushState = pushStateSpy;
            const { setQueryParams } = queryParamService<{ filter: string | null | undefined }>();

            setQueryParams({ filter: undefined });
            setQueryParams({ filter: null });

            expect(pushStateSpy).toHaveBeenNthCalledWith(1, {}, '', 'http://localhost/');
            expect(pushStateSpy).toHaveBeenNthCalledWith(2, {}, '', 'http://localhost/');
        });
    });
});
