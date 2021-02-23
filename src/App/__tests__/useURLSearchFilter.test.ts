import { act, renderHook } from '@testing-library/react-hooks';

import { useURLSearchFilter } from '../useURLSearchFilter';
import { queryParamService } from '../../utils';

jest.mock('../../utils/queryParamService');

const queryParamServiceMock = queryParamService as jest.Mock;

describe('useURLSearchFilter', () => {
    it('listens to the onpopstate event and will re-render with the latest search params when it is triggered', () => {
        queryParamServiceMock.mockReturnValueOnce({
            queryParams: {
                searchFilter: 'Italy',
            },
        });
        queryParamServiceMock.mockReturnValueOnce({ queryParams: {} });
        const { result } = renderHook(() => useURLSearchFilter());

        act(() => {
            window?.onpopstate?.({} as PopStateEvent);
        });

        expect(result.current[0]).toBeUndefined();
    });
});
