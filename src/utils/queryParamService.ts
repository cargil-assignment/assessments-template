export function queryParamService<
    QueryParamDictionary extends Record<string, string | null | undefined>
>(): {
    queryParams: QueryParamDictionary;
    setQueryParams: (newParams: QueryParamDictionary) => void;
} {
    const { search } = window.location;
    const urlSearchParams = new URLSearchParams(search);
    return {
        queryParams: Array.from(urlSearchParams.keys()).reduce(
            (result, value) => ({ ...result, [value]: urlSearchParams.get(value) }),
            {} as QueryParamDictionary,
        ),
        setQueryParams: (newParams) => {
            const newUrl = computeNewUrl(newParams);
            if (window.location.search !== newUrl.search) {
                window.history.pushState({}, '', newUrl.toString());
            }
        },
    };
}

function computeNewUrl<T extends Record<string, string | null | undefined>>(newParams: T): URL {
    const url = new window.URL(window.location.href);

    Object.keys(newParams).forEach((key: string) => {
        const value = newParams[key];
        if (value !== null && value !== undefined && value !== '') {
            url.searchParams.set(key, value);
        } else {
            url.searchParams.delete(key);
        }
    });
    return url;
}
