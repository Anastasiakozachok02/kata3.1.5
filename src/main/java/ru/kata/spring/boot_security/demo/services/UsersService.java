package ru.kata.spring.boot_security.demo.services;

import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;

public interface UsersService {
    User findByEmail(String email);

    List<User> getAll();

    void add(User user);

    void deleteById(Long id);

    User getById(Long id);

    void change(User user);
}
