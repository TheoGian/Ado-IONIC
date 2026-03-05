import { useState } from 'react';
import {
  IonPage, IonContent, IonHeader, IonTitle, IonToolbar,
  IonItem, IonLabel, IonInput, IonButton, IonIcon, IonToast, IonLoading
} from '@ionic/react';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { login, saveSession } from '../services/auth';

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('demo@exemplo.com');
  const [password, setPassword] = useState('123456');
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(false);

  async function onSubmit() {
    try {
      setSubmitting(true);
      const { token, name } = await login({ email, password });
      saveSession(token, name);
      setToast(true);
      setTimeout(() => history.replace('/home'), 400);
    } catch (err) {
      alert('E-mail ou senha incorretos');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Entrar</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">E-mail</IonLabel>
          <IonInput
            value={email}
            onIonChange={(e) => setEmail(e.detail.value ?? '')}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Senha</IonLabel>
          <IonInput
            type={showPass ? 'text' : 'password'}
            value={password}
            onIonChange={(e) => setPassword(e.detail.value ?? '')}
          />
          <IonButton
            fill="clear"
            slot="end"
            onClick={() => setShowPass(!showPass)}
          >
            <IonIcon icon={showPass ? eyeOffOutline : eyeOutline} />
          </IonButton>
        </IonItem>

        <IonButton expand="block" onClick={onSubmit}>
          Entrar
        </IonButton>

        <IonLoading isOpen={submitting} message="Autenticando..." />
        <IonToast
          isOpen={toast}
          message="Login bem-sucedido"
          duration={1200}
          onDidDismiss={() => setToast(false)}
        />
      </IonContent>
    </IonPage>
  );
}