package com.example.springapp.controller;

import com.example.springapp.model.CheckoutRequest;
import com.example.springapp.model.OrderSummary;
import com.example.springapp.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {
    @Autowired
    private CheckoutService checkoutService;

    @PostMapping
    public OrderSummary checkout(@RequestBody CheckoutRequest request) {
        return checkoutService.processCheckout(request);
    }
}
