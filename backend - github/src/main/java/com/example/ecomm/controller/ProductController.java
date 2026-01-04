package com.example.ecomm.controller;

import com.example.ecomm.dto.ProductDTO;
import com.example.ecomm.model.Product;
import com.example.ecomm.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductRepository repository;

    public ProductController(ProductRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<ProductDTO> getProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Boolean featured
    ) {
        List<Product> products;

        if (featured != null && featured) {
            products = repository.findByFeaturedTrueOrderByIdDesc();
        }
        else if (category != null && type != null) {

            // food,treats gibi çoklu type desteği
            List<String> types = List.of(type.split(","));

            if (types.size() == 1) {
                products = repository
                        .findByCategoryIgnoreCaseAndTypeIgnoreCase(category, types.get(0));
            } else {
                products = repository
                        .findByCategoryIgnoreCaseAndTypeInIgnoreCase(category, types);
            }
        }
        else {
            products = repository.findAll();
        }

        return products.stream()
                .map(p -> new ProductDTO(
                        p.getId(),
                        p.getName(),
                        p.getDescription(),
                        p.getPrice(),
                        p.getImageUrl(),
                        p.getDetails()
                ))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ProductDTO getOne(@PathVariable Long id) {
        Product p = repository.findById(id).orElseThrow();
        return new ProductDTO(
                p.getId(),
                p.getName(),
                p.getDescription(),
                p.getPrice(),
                p.getImageUrl(),
                p.getDetails()
        );
    }
}
