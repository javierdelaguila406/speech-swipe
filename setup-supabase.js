#!/usr/bin/env node
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://foepjflkcxtskmrndous.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_rgGVc_qtEUQr7KqK4DuSTQ_P_1N6Lfs';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const sql = `
-- Users profile
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE,
  full_name TEXT,
  role TEXT CHECK (role IN ('user', 'caregiver')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Phrases table
CREATE TABLE IF NOT EXISTS public.phrases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  keyword TEXT,
  category TEXT,
  image_url TEXT,
  normal_audio_url TEXT,
  slow_audio_url TEXT,
  lip_video_url TEXT,
  is_visible BOOLEAN DEFAULT true,
  is_favorite BOOLEAN DEFAULT false,
  order_index INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Practice records
CREATE TABLE IF NOT EXISTS public.practice_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  phrase_id UUID NOT NULL REFERENCES public.phrases(id) ON DELETE CASCADE,
  pronunciation_score FLOAT,
  recorded_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.phrases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_records ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can read own phrases" ON public.phrases
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own phrases" ON public.phrases
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can read own practice records" ON public.practice_records
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own practice records" ON public.practice_records
  FOR INSERT WITH CHECK (auth.uid() = user_id);
`;

async function setupSupabase() {
  try {
    console.log('📊 Setting up Supabase tables...');

    // Execute SQL using rpc call
    const { error } = await supabase.rpc('exec_sql', { sql_string: sql });

    if (error) {
      console.log('⚠️  Note: You may need to run SQL manually in Supabase');
      console.log('📍 Go to: Supabase Dashboard > SQL Editor > New Query');
      console.log('📋 Paste the SQL above and click Run');
    } else {
      console.log('✅ Tables created successfully!');
    }
  } catch (err) {
    console.error('Error:', err.message);
    console.log('\n📍 Please run the SQL manually:');
    console.log('1. Go to Supabase Dashboard');
    console.log('2. Click "SQL Editor"');
    console.log('3. Click "+ New Query"');
    console.log('4. Paste the SQL and click "Run"');
  }
}

setupSupabase();
