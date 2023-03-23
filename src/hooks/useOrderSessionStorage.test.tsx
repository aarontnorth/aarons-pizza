import { act, renderHook } from '@testing-library/react';
import useOrderSessionStorage from './useOrderSessionStorage';

describe('useTaxExemptionSessionStorage', () => {
  afterEach(() => {
    window.sessionStorage.clear();
  });

  it('should return initial table', () => {
    const { result } = renderHook(() => useOrderSessionStorage());
    expect(result.current.currentTable).toEqual(1);
  });

  it('should increment table', () => {
    const { result } = renderHook(() => useOrderSessionStorage());

    act(() => {
      result.current.incrementTable();
    });

    expect(result.current.currentTable).toEqual(2);
  });
});
