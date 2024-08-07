package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UsersService;

import javax.validation.Validator;
import java.security.Principal;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UsersService usersService;
    private final RoleService roleService;
    private final Validator validator;


    public AdminController(UsersService usersService, RoleService roleService, Validator validator) {
        this.usersService = usersService;
        this.roleService = roleService;
        this.validator = validator;
    }

    @GetMapping
    public String index(Model model, Principal principal) {
        model.addAttribute("users", usersService.getAll());
        model.addAttribute("newUser", new User());
        model.addAttribute("username", principal.getName());
        model.addAttribute("roles", usersService.findByEmail(principal.getName()).getRoles());
        model.addAttribute("allRoles", roleService.getAllRoles());
        return "admin";
    }

    @PostMapping
    public String add(@ModelAttribute("newUser") User user) {
        usersService.add(user);
        return "redirect:admin";
    }

    @PostMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        usersService.deleteById(id);
        return "redirect:/admin";
    }
}
