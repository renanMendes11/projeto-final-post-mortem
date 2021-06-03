package com.postmortembackend.controllers;
import com.postmortembackend.models.User;
import com.postmortembackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("")
    private List<User> index() throws ExecutionException, InterruptedException{
        return this.userService.index();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("")
    private String store(@RequestBody User user, HttpServletResponse response) throws ExecutionException, InterruptedException {
        return this.userService.save(user, response);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{id}")
    private User show(@PathVariable("id") String id) throws ExecutionException, InterruptedException{
        return (User) this.userService.show(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/email/{email}")
    private User showByEmail(@PathVariable("email") String email) throws ExecutionException, InterruptedException{
        return (User) this.userService.showByEmail(email);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/{id}")
    private void update(@RequestBody User user, @PathVariable("id") String id) throws ExecutionException, InterruptedException {
        this.userService.update(user, id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{id}")
    private void delete(@PathVariable("id") String id){
        this.userService.delete(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login/{id}")
    private void login(@PathVariable("id") String id) throws ExecutionException, InterruptedException {
        this.userService.login(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/logout/{id}")
    private void logout(@PathVariable("id") String id) throws ExecutionException, InterruptedException{
        this.userService.logout(id);
    }
}
