create extension if not exists "pgcrypto";

create table if not exists basics (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  label text,
  picture text,
  email text,
  phone text,
  website text,
  summary text[],
  city text,
  country_code text,
  postal_code text,
  updated_at timestamptz default now()
);

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  network text not null,
  username text,
  url text,
  sort_order int default 0
);

create table if not exists work (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  logo text,
  website text,
  position text not null,
  employment_type text,
  mode text,
  location text,
  start_date date not null,
  end_date date,
  summary text,
  highlights text[],
  skills text[],
  sort_order int default 0
);

create table if not exists education (
  id uuid primary key default gen_random_uuid(),
  institution text not null,
  logo text,
  website text,
  degree text,
  area text,
  location text,
  start_date date not null,
  end_date date,
  gpa text,
  gpa_german text,
  summary text,
  courses text[],
  sort_order int default 0
);

create table if not exists skill_groups (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text[],
  type text default 'hard',
  sort_order int default 0
);

create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  group_id uuid references skill_groups(id) on delete cascade,
  name text not null,
  level int check (level between 0 and 100),
  sort_order int default 0
);

create table if not exists languages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  level text,
  sort_order int default 0
);

create table if not exists interests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  keywords text[],
  sort_order int default 0
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  image_thumb text,
  image_modal text,
  website text,
  category text,
  publisher text,
  release_date date,
  description text,
  keywords text[],
  sort_order int default 0
);

create table if not exists certifications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text,
  logo text,
  issue_date date,
  credential_url text,
  sort_order int default 0
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  position text,
  company text,
  reference text,
  sort_order int default 0
);

-- RLS
alter table basics enable row level security;
alter table profiles enable row level security;
alter table work enable row level security;
alter table education enable row level security;
alter table skill_groups enable row level security;
alter table skills enable row level security;
alter table languages enable row level security;
alter table interests enable row level security;
alter table projects enable row level security;
alter table certifications enable row level security;
alter table testimonials enable row level security;

create policy "Public read basics" on basics for select using (true);
create policy "Public read profiles" on profiles for select using (true);
create policy "Public read work" on work for select using (true);
create policy "Public read education" on education for select using (true);
create policy "Public read skill_groups" on skill_groups for select using (true);
create policy "Public read skills" on skills for select using (true);
create policy "Public read languages" on languages for select using (true);
create policy "Public read interests" on interests for select using (true);
create policy "Public read projects" on projects for select using (true);
create policy "Public read certifications" on certifications for select using (true);
create policy "Public read testimonials" on testimonials for select using (true);

create policy "Auth write basics" on basics for all using (auth.role() = 'authenticated');
create policy "Auth write profiles" on profiles for all using (auth.role() = 'authenticated');
create policy "Auth write work" on work for all using (auth.role() = 'authenticated');
create policy "Auth write education" on education for all using (auth.role() = 'authenticated');
create policy "Auth write skill_groups" on skill_groups for all using (auth.role() = 'authenticated');
create policy "Auth write skills" on skills for all using (auth.role() = 'authenticated');
create policy "Auth write languages" on languages for all using (auth.role() = 'authenticated');
create policy "Auth write interests" on interests for all using (auth.role() = 'authenticated');
create policy "Auth write projects" on projects for all using (auth.role() = 'authenticated');
create policy "Auth write certifications" on certifications for all using (auth.role() = 'authenticated');
create policy "Auth write testimonials" on testimonials for all using (auth.role() = 'authenticated');
