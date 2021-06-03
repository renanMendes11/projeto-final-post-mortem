package com.postmortembackend.controllers;

import com.postmortembackend.models.Contact;
import com.postmortembackend.services.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/contacts")
public class ContactController {
    @Autowired
    private ContactService contactService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("")
    private List<Contact> index() throws ExecutionException, InterruptedException{
        return this.contactService.index();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("")
    private String store(@RequestBody Contact contact) throws ExecutionException, InterruptedException {
        return this.contactService.save(contact);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{id}")
    private Contact show(@PathVariable("id") String id) throws ExecutionException, InterruptedException{
        return (Contact) this.contactService.show(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/{id}")
    private void update(@RequestBody Contact contact, @PathVariable("id") String id) throws ExecutionException, InterruptedException {
        this.contactService.update(contact, id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{id}")
    private void delete(@PathVariable("id") String id){
            this.contactService.delete(id);
        }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/user/{id}")
    private List<Contact> showByUserId(@PathVariable("id") String id) throws ExecutionException, InterruptedException{
        return this.contactService.showByUserId(id);
    }
}
