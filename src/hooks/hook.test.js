import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useHook } from "./useHook";

beforeEach(() => {
  localStorage.clear();
});

describe("cart logic", () => {
  it("adds item to cart", () => {
    const { result } = renderHook(() => useHook());

    act(() => {
      result.current.addToCart({ id: 1, name: "shoe" });
    });

    expect(result.current.cartItems.length).toBe(1);
    expect(result.current.cartItems[0].quantity).toBe(1);
  });

  it("increases qty if item already exists", () => {
    const { result } = renderHook(() => useHook());

    act(() => {
      result.current.addToCart({ id: 1 });
      result.current.addToCart({ id: 1 });
    });

    expect(result.current.cartItems.length).toBe(1);
    expect(result.current.cartItems[0].quantity).toBe(2);
  });

  it("removes item", () => {
    const { result } = renderHook(() => useHook());

    act(() => {
      result.current.addToCart({ id: 1 });
      result.current.removeFromCart(1);
    });

    expect(result.current.cartItems.length).toBe(0);
  });

  it("decrease qty", () => {
    const { result } = renderHook(() => useHook());

    act(() => {
      result.current.addToCart({ id: 1 });
      result.current.addToCart({ id: 1 });
      result.current.decreaseQty(1);
    });

    expect(result.current.cartItems[0].quantity).toBe(1);
  });

  it("checks if item is in cart", () => {
    const { result } = renderHook(() => useHook());

    act(() => {
      result.current.addToCart({ id: 1 });
    });

    expect(result.current.isInCart(1)).toStrictEqual({ id: 1, quantity: 1 });
    expect(result.current.isInCart(2)).toBe(undefined);
  });
});

describe("wishlist logic", () => {
  it("add item to wishlist and is in wishlist", () => {
    const { result } = renderHook(() => useHook());

    act(() => {
      result.current.addToWishlist({ id: 1, name: "Shoe" });
    });

    expect(result.current.wishlistItems.length).toBe(1);
    expect(result.current.isInWishlist(1)).toStrictEqual({
      id: 1,
      name: "Shoe",
    });
    expect(result.current.isInWishlist(2)).toBe(undefined);
  });

  it("remove from wishlist", () => {
    const { result } = renderHook(() => useHook());

    act(() => {
      result.current.addToWishlist({ id: 1 });
      result.current.removeFromWishlist(1);
    });

    expect(result.current.wishlistItems.length).toBe(0);
  });
});
