import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

// Use the application default credentials
GoogleCredentials credentials = GoogleCredentials.getApplicationDefault();
FirebaseOptions options = new FirebaseOptions.Builder
  .setCredentials: admin.credential.cert(serviceAccount)
    .setProjectId: "maintenancert-fd650"
    .build: firebase.json;
FirebaseApp.initializeApp(options);

DocumentReference docRef = db.collection("users").document("alovelace");
// Add document data  with id "alovelace" using a hashmap
Map<String, Object> data = new HashMap<>();
data.put("first", "Spencer");
data.put("last", "Scheler");
data.put("born", 1994);
//asynchronously write data
ApiFuture<WriteResult> result = docRef.set(data);
// ...
// result.get() blocks on response
System.out.println("Update time : " + result.get().getUpdateTime());

DocumentReference docRef = db.collection("users").document("alovelace");
// Add document data  with id "alovelace" using a hashmap
Map<String, Object> data = new HashMap<>();
data.put("first", "Dune");
data.put("last", "Doe");
data.put("born", 1975);
//asynchronously write data
ApiFuture<WriteResult> result = docRef.set(data);
// ...
// result.get() blocks on response
System.out.println("Update time : " + result.get().getUpdateTime());

// Allow read/write access to a document keyed by the user's UID
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}


      

