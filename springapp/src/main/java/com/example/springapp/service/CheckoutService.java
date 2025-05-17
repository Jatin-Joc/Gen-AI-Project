package com.example.springapp.service;

import com.example.springapp.model.CheckoutRequest;
import com.example.springapp.model.OrderSummary;
import org.springframework.stereotype.Service;

@Service
public class CheckoutService {
    public OrderSummary processCheckout(CheckoutRequest request) {
        return new OrderSummary();
    }
}
