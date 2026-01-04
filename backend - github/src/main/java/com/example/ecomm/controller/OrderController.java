package com.example.ecomm.controller;

import com.example.ecomm.dto.OrderRequest;
import com.example.ecomm.dto.OrderResponse;
import com.example.ecomm.model.Order;
import com.example.ecomm.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000") // React frontend adresini ekle
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }
    @GetMapping("/test")
    public ResponseEntity<String> testBackend() {
        return ResponseEntity.ok("Backend is working ✅");
    }
    @PostMapping
    public ResponseEntity<Void> placeOrder(@RequestBody OrderRequest orderRequest) {
        orderService.placeOrder(orderRequest);
        return ResponseEntity.status(201).build();
    }
    @GetMapping
    public ResponseEntity<List<OrderResponse>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }


}
