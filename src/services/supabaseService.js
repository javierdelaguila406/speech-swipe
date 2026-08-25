// Supabase Integration Service
// Para usar, instala: npm install @supabase/supabase-js
// Y configura tus variables de entorno
export class SupabaseService {
    constructor() {
        Object.defineProperty(this, "supabase", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "initialized", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
    }
    async init(config) {
        try {
            // Importar dinámicamente para no hacer obligatorio
            const { createClient } = await import('@supabase/supabase-js');
            this.supabase = createClient(config.supabaseUrl, config.supabaseKey);
            this.initialized = true;
            console.log('Supabase initialized successfully');
        }
        catch (error) {
            console.error('Failed to initialize Supabase:', error);
            throw new Error('Supabase initialization failed');
        }
    }
    async syncPhrases(userId, phrases) {
        if (!this.initialized) {
            console.warn('Supabase not initialized');
            return;
        }
        try {
            const { error } = await this.supabase
                .from('phrases')
                .upsert(phrases.map(p => ({
                ...p,
                user_id: userId,
                updated_at: new Date().toISOString()
            })), { onConflict: 'id,user_id' });
            if (error)
                throw error;
            console.log('Phrases synced successfully');
        }
        catch (error) {
            console.error('Failed to sync phrases:', error);
            throw error;
        }
    }
    async getPhrasesFromServer(userId) {
        if (!this.initialized) {
            console.warn('Supabase not initialized');
            return [];
        }
        try {
            const { data, error } = await this.supabase
                .from('phrases')
                .select('*')
                .eq('user_id', userId)
                .order('order', { ascending: true });
            if (error)
                throw error;
            return data || [];
        }
        catch (error) {
            console.error('Failed to fetch phrases:', error);
            return [];
        }
    }
    async savePhraseToServer(userId, phrase) {
        if (!this.initialized)
            return;
        try {
            const { error } = await this.supabase
                .from('phrases')
                .upsert({
                ...phrase,
                user_id: userId,
                updated_at: new Date().toISOString()
            });
            if (error)
                throw error;
        }
        catch (error) {
            console.error('Failed to save phrase:', error);
            throw error;
        }
    }
    async deletePhrase(userId, phraseId) {
        if (!this.initialized)
            return;
        try {
            const { error } = await this.supabase
                .from('phrases')
                .delete()
                .eq('id', phraseId)
                .eq('user_id', userId);
            if (error)
                throw error;
        }
        catch (error) {
            console.error('Failed to delete phrase:', error);
            throw error;
        }
    }
    async uploadMedia(userId, phraseId, file, type) {
        if (!this.initialized)
            throw new Error('Supabase not initialized');
        try {
            const fileName = `${userId}/${phraseId}/${type}-${Date.now()}`;
            const bucket = type === 'audio' ? 'audio-files' : 'video-files';
            const { error: uploadError } = await this.supabase.storage
                .from(bucket)
                .upload(fileName, file);
            if (uploadError)
                throw uploadError;
            const { data } = await this.supabase.storage
                .from(bucket)
                .getPublicUrl(fileName);
            return data?.publicUrl || '';
        }
        catch (error) {
            console.error('Failed to upload media:', error);
            throw error;
        }
    }
    async getUserStats(userId) {
        if (!this.initialized) {
            return {
                totalPhrases: 0,
                totalFavorites: 0,
                practiceCount: 0,
                lastPracticeDate: null
            };
        }
        try {
            const { data: phrases } = await this.supabase
                .from('phrases')
                .select('isFavorite, practiceCount')
                .eq('user_id', userId);
            if (!phrases)
                return {
                    totalPhrases: 0,
                    totalFavorites: 0,
                    practiceCount: 0,
                    lastPracticeDate: null
                };
            return {
                totalPhrases: phrases.length,
                totalFavorites: phrases.filter((p) => p.isFavorite).length,
                practiceCount: phrases.reduce((sum, p) => sum + (p.practiceCount || 0), 0),
                lastPracticeDate: new Date().toISOString()
            };
        }
        catch (error) {
            console.error('Failed to get user stats:', error);
            return {
                totalPhrases: 0,
                totalFavorites: 0,
                practiceCount: 0,
                lastPracticeDate: null
            };
        }
    }
}
export const supabaseService = new SupabaseService();
