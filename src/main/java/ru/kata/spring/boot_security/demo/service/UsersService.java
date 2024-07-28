package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UsersService extends UserDetailsService {
    User findByEmail(String email);

    List<User> getAll();

    void add(User user);

    void deleteById(Long id);

    User getById(Long id);

    void change(User user);
}
