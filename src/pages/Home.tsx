import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';

export default function Home() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Você está logado!</h2>
        <IonButton
          onClick={() => {
            localStorage.clear();
            window.location.href = '/login';
          }}
        >
          Sair
        </IonButton>
      </IonContent>
    </IonPage>
  );
}