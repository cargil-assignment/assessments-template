import { act, renderHook } from '@testing-library/react-hooks';
import { queryParamService } from '../../utils/queryParamService';

import { useSort } from '../useSort';

jest.mock('../../utils/queryParamService');

const queryParamServiceMock = queryParamService as jest.Mock;

/* setup to be able to mutate window.location.search in JSDOM */
const location = {
    ...window.location,
    search: '?searchFilter=CH',
};
Object.defineProperty(window, 'location', {
    writable: true,
    value: location,
});

describe('useSort', () => {
    it('returns sortColumn and sortOrder from the sort query param', () => {
        queryParamServiceMock.mockReturnValueOnce({
            queryParams: {
                sort: 'population+asc',
            },
        });
        const { result } = renderHook(() => useSort());

        const sort = result.current[0];

        expect(sort?.sortColumn).toBe('population');
        expect(sort?.sortOrder).toBe('asc');
    });

    it('returns sortColumn and sortOrder as undefined when there is no sort query param', () => {
        queryParamServiceMock.mockReturnValueOnce({
            queryParams: {},
        });
        const { result } = renderHook(() => useSort());

        const sort = result.current[0];

        expect(sort?.sortColumn).toBeUndefined();
        expect(sort?.sortOrder).toBeUndefined();
    });

    it('returns a setter function which can be used to set the sort value in the url', () => {
        const setQueryParamsSpy = jest.fn();
        queryParamServiceMock.mockReturnValueOnce({
            queryParams: {},
            setQueryParams: setQueryParamsSpy,
        });
        queryParamServiceMock.mockReturnValueOnce({
            queryParams: { sort: 'population+asc' },
            setQueryParams: setQueryParamsSpy,
        });
        const { result } = renderHook(() => useSort());

        const handleSortPopulation = result.current[1];

        act(() => {
            handleSortPopulation('population');
        });

        const sort = result.current[0];
        expect(sort?.sortColumn).toBe('population');
        expect(sort?.sortOrder).toBe('asc');
    });
});
