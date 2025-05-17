package com.example.springapp.controller;

import com.example.springapp.model.Cart;
import com.example.springapp.model.CartItem;
import com.example.springapp.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping
    public Cart getCart() {
        return cartService.getCart();
    }

    @PostMapping("/add")
    public Cart addToCart(@RequestBody CartItem item) {
        return cartService.addToCart(item);
    }

    @PostMapping("/remove")
    public Cart removeFromCart(@RequestBody CartItem item) {
        return cartService.removeFromCart(item);
    }

    @PostMapping("/clear")
    public Cart clearCart() {
        return cartService.clearCart();
    }
}
