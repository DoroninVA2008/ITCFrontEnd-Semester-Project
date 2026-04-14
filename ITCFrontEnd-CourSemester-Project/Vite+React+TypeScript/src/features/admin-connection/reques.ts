import { adminList } from '../../entities/cons'

export const handleRequest = () => {
    const response = async () => {
        try { 
            await fetch(adminList, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
        }
    };
  return { handleRequest };
}
