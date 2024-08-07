package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import ru.kata.spring.boot_security.demo.services.UsersService;

import java.security.Principal;

@Controller
public class UsersController {
    private final UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping("/user")
    public String user(Principal principal, Model model) {
        model.addAttribute("user", usersService.findByEmail(principal.getName()));
        model.addAttribute("username", principal.getName());
        model.addAttribute("roles", usersService.findByEmail(principal.getName()).getRoles());
        return "user";
    }

}

