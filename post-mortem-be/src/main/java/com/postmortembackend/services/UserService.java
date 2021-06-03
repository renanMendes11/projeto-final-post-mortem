package com.postmortembackend.services;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.postmortembackend.models.Contact;
import com.postmortembackend.models.User;
import com.postmortembackend.rabbitMq.Producer;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.util.*;
import java.util.concurrent.ExecutionException;

@Service
public class UserService {
    private static final String COLLECTION_NAME = "users";

    public List<User> index() throws InterruptedException, ExecutionException {
        Firestore db = FirestoreClient.getFirestore();
        Iterable <DocumentReference> documentReference = db.collection(COLLECTION_NAME).listDocuments();
        Iterator<DocumentReference> iterator = documentReference.iterator();

        List<User> userList = new ArrayList<>();
        User user= null;

        while (iterator.hasNext()){
            DocumentReference documentReference1 = iterator.next();
            ApiFuture<DocumentSnapshot> future = documentReference1.get();
            DocumentSnapshot document = future.get();

            user = document.toObject(User.class);
            userList.add(user);
        }

        return userList;
    }

    public String save(User user, HttpServletResponse response) throws InterruptedException, ExecutionException {
        Firestore db = FirestoreClient.getFirestore();
        CollectionReference users = db.collection(COLLECTION_NAME);
        Query query = users.whereEqualTo("email", user.getEmail());
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        for (DocumentSnapshot document : querySnapshot.get().getDocuments()) {
            if(document.getData() != null){
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return "Email já cadastrado!";
            }
        }
        final String uuid = UUID.randomUUID().toString().replace("-", "");
        user.setId(uuid);
        ApiFuture<WriteResult> collectionsApiFuture = db.collection(COLLECTION_NAME).document(user.getId()).set(user);
        User userReturn = (User) this.show(user.getId());
        return userReturn.getId();
    }

    

    public Object show(String id) throws InterruptedException, ExecutionException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference documentReference = db.collection(COLLECTION_NAME).document(id);
        ApiFuture<DocumentSnapshot> future = documentReference.get();

        DocumentSnapshot document = future.get();

        User user = null;

        if(document.exists()) {
            user = document.toObject(User.class);
            return user;
        }else {
            return null;
        }
    }

    public Object showByEmail(String email) throws InterruptedException, ExecutionException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = db.collection(COLLECTION_NAME).whereEqualTo("email", email).get();

        User user = null;
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        for (DocumentSnapshot document : documents) {
            System.out.println(document.getId() + " => " + document.toObject(Contact.class));
            user = document.toObject(User.class);
        }
        return user;
    }

    public String update(User user, String id) throws InterruptedException, ExecutionException {
        Firestore db = FirestoreClient.getFirestore();
        User userUpdate = (User) this.show(id);
        user.setId(userUpdate.getId());
        ApiFuture<WriteResult> collectionsApiFuture = db.collection(COLLECTION_NAME).document(userUpdate.getId()).set(user);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public String delete(String id) {
        Firestore db= FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = db.collection(COLLECTION_NAME).document(id).delete();
        return "Document has been deleted";
    }

    public void login(String id) throws ExecutionException, InterruptedException {
        Date now = new Date();
        Firestore db = FirestoreClient.getFirestore();
        User userUpdate = (User) this.show(id);
        userUpdate.setLastLogin(now);
       db.collection(COLLECTION_NAME).document(userUpdate.getId()).set(userUpdate);
    }

    public void logout(String id) throws ExecutionException, InterruptedException {
        User userUpdate = (User) this.show(id);
        Date now = new Date();
        userUpdate.setLastLogout(now);
        Firestore db = FirestoreClient.getFirestore();
        db.collection(COLLECTION_NAME).document(userUpdate.getId()).set(userUpdate);
        Thread thread = new Thread();
        thread.start();
        try {
            thread.sleep(10000);
            if (!thread.isAlive()){ // thread encerrou
                User userCheck = (User) this.show(id);
                if(userCheck.getLastLogout().after(userCheck.getLastLogin()))  {
                    Producer producer = new Producer();
                    producer.main(id);
                }
            }
        }catch (Exception e) {
            e.printStackTrace();
        }
    }
}
