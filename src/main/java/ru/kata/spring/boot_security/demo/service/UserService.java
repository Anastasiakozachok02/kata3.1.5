package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService {

    Long add(User user);

    User getById(Long id);

    void update(User user);

    void deleteById(Long id);

    List<User> getAll();
}
