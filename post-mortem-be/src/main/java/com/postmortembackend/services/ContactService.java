package com.postmortembackend.services;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.postmortembackend.models.Contact;
import com.postmortembackend.models.User;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

@Service
public class ContactService {
    private static final String COLLECTION_NAME = "contacts";

    public List<Contact> index() throws InterruptedException, ExecutionException{
        Firestore db = FirestoreClient.getFirestore();
        Iterable <DocumentReference> documentReference = db.collection(COLLECTION_NAME).listDocuments();
        Iterator<DocumentReference> iterator = documentReference.iterator();

        List<Contact> contactList = new ArrayList<>();
        Contact contact= null;

        while (iterator.hasNext()){
            DocumentReference documentReference1 = iterator.next();
            ApiFuture<DocumentSnapshot> future = documentReference1.get();
            DocumentSnapshot document = future.get();

            contact = document.toObject(Contact.class);
            contactList.add(contact);
        }

        return contactList;
    }

    public String save(Contact contact) throws InterruptedException, ExecutionException {
        Firestore db = FirestoreClient.getFirestore();
        final String uuid = UUID.randomUUID().toString().replace("-", "");
        contact.setId(uuid);
        ApiFuture<WriteResult> collectionsApiFuture = db.collection(COLLECTION_NAME).document(contact.getId()).set(contact);
        return contact.getId();
    }

    public Object show(String id) throws InterruptedException, ExecutionException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference documentReference = db.collection(COLLECTION_NAME).document(id);
        ApiFuture<DocumentSnapshot> future = documentReference.get();

        DocumentSnapshot document = future.get();

        Contact contact = null;

        if(document.exists()) {
            contact = document.toObject(Contact.class);
            return contact;
        }else {
            return null;
        }
    }

    public String update(Contact contact, String id) throws InterruptedException, ExecutionException {
        Firestore db = FirestoreClient.getFirestore();
        Contact contactUpdate = (Contact) this.show(id);
        contact.setId(contactUpdate.getId());
        ApiFuture<WriteResult> collectionsApiFuture = db.collection(COLLECTION_NAME).document(contactUpdate.getId()).set(contact);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public String delete(String id) {
        Firestore db= FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = db.collection(COLLECTION_NAME).document(id).delete();
        return "Document has been deleted";
    }

    public List<Contact> showByUserId(String id) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = db.collection(COLLECTION_NAME).whereEqualTo("userId", id).get();

        List<Contact> contactList = new ArrayList<>();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        for (DocumentSnapshot document : documents) {
            System.out.println(document.getId() + " => " + document.toObject(Contact.class));
            Contact contact = document.toObject(Contact.class);
            contactList.add(contact);
        }
        return contactList;
    }
}
