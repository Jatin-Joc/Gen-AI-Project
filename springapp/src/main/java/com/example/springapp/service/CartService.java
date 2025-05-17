package com.example.springapp.service;

import com.example.springapp.model.Cart;
import com.example.springapp.model.CartItem;
import org.springframework.stereotype.Service;

@Service
public class CartService {
    public Cart getCart() { return new Cart(); }
    public Cart addToCart(CartItem item) { return new Cart(); }
    public Cart removeFromCart(CartItem item) { return new Cart(); }
    public Cart clearCart() { return new Cart(); }
}
