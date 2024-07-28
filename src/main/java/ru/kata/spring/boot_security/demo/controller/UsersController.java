package ru.kata.spring.boot_security.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import ru.kata.spring.boot_security.demo.service.UsersService;

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
        return "user";
    }

}

