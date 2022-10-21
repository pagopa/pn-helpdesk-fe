/**
 * @jest-environment jsdom
 */
import 'regenerator-runtime/runtime'
import { deleteStorage, getStorage, resetStorage, setStorage } from "../storage";


describe('Storage', () => {
    it('setStorage', async() => {
         let res;
         try {
           res = await setStorage("token", "test");
         } catch (e) {
           return e;
         } finally {
            console.log(res)
            expect(res).toEqual("OK");
         }
    });

    it('deleteStorage', async() => {
        setStorage("token", "test");
        try {
            await deleteStorage("token");
        } catch (e) {
            return e;
        } finally {
            expect(sessionStorage.getItem("token")).toEqual(null);
        }
    });

    it('resetStorage', async() => {
        setStorage("token", "test")
        try {
            await resetStorage();
        } catch (e) {
            return e;
        } finally {
            expect(sessionStorage.length).toEqual(0);
        }
    });

    it('getStorage', async() => {
        setStorage("token", "test")
        let res;
        try {
            res = await getStorage("token");
        } catch (e) {
            return e;
        } finally {
            expect(res).toEqual("test");
        }
    });

})