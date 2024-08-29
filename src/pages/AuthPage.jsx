import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebaseConfig'; // Assicurati che `app` sia esportato da firebaseConfig
import Navbar from '../components/Navbar';

function AuthPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const auth = getAuth(app);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
        } catch (error) {
            console.error('Errore durante l\'autenticazione', error);
            // Gestisci gli errori qui (ad esempio, mostra un messaggio all'utente)
        }
    };

    return (
        <div className="flex flex-col min-h-screen"> {/* Contenitore Flex che occupa tutta la schermata */}
            <Navbar />
            <div className="flex-grow px-5"> {/* Div che cresce per riempire lo spazio rimanente */}
                <section className="bg-gray-50 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            {/* <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/> */}
                            <img className="w-8 h-8 mr-2" src="/vite.svg" alt="logo" />
                            TravelApp
                        </a>
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    {isLogin ? 'Accedi al tuo account' : 'Registrati per un account'}
                                </h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">La tua email</label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            id="email" 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                            placeholder="nome@utente.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} 
                                            required 
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input 
                                            type="password" 
                                            name="password" 
                                            id="password" 
                                            placeholder="••••••••" 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input 
                                                    id="remember" 
                                                    aria-describedby="remember" 
                                                    type="checkbox" 
                                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Ricordami</label>
                                            </div>
                                        </div>
                                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Password dimenticata?</a>
                                    </div>
                                    <button 
                                    type="submit" 
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        {isLogin ? 'Accedi' : 'Registrati'}
                                    </button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        {isLogin ? (
                                            <>Non hai ancora un account? <button type="button" onClick={() => setIsLogin(false)} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Registrati</button></>
                                        ) : (
                                            <>Hai già un account? <button type="button" onClick={() => setIsLogin(true)} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Accedi</button></>
                                        )}
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AuthPage;
