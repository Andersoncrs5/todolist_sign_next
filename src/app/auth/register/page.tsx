'use client'
import CustomInput from '@/components/CustomInput/CustomInput.component';
import { useRegister } from './service';
import BtnSubmit from '@/components/btnSubmit/btnSubmit.component';
import Alert from '@/components/alert/alert.component';
import ErrorForm from '@/components/ErrorForm/ErrorForm.component';

export default function Register() {

  const { email, alert , error, handleSubmit , setName , setEmail , setPassword, messageAlert, messageForm, isSubmitting, name, password } = useRegister();

  return (
    <div 
      className="h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/layout/planetJupiter.jpg')" }}
    >
      <div className="flex items-center justify-center min-h-screen ">
        <div className="text-center shadow-md w-full max-w-md ">
          {alert && <Alert name={messageAlert} /> }
          {messageForm && <ErrorForm data={error} /> }
          <form onSubmit={handleSubmit}>
            <div className="p-3 border rounded">
              <CustomInput 
                nameLabel='Name:'
                value={name} 
                onChange={(e) => setName(e.target.value) } 
                type={'text'} 
                placeholder={'Your name'}               
              />
              <CustomInput 
                nameLabel={'Email:'}
                value={email} 
                onChange={(e) => setEmail(e.target.value) } 
                type={'email'}                
                placeholder={'youremail@gmail.com'}
              />
              <CustomInput
                nameLabel={'Password:'}
                value={password} 
                onChange={(e) => setPassword(e.target.value) } 
                type={'password'}                
                placeholder={'your password'}
              />
              <BtnSubmit isSubmitting={isSubmitting} more='mt-1' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
