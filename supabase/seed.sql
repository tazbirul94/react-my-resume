-- Seed data derived from resume.example.en_US.js

-- basics
INSERT INTO basics (name, label, picture, email, phone, website, summary, city, country_code, postal_code)
VALUES (
  'MD TAZBIRUL HAQUE',
  'SOFTWARE ENGINEER',
  '../resouces/images/galaxy head.jpg',
  'tazbirul94@gmail.com',
  '+49 17657742207',
  '<WEBSITE>',
  ARRAY[
    'Doing Masters in Information Engineering and Computer Science in Hochschule Rhein-Waal',
    'Currently working as a Software Engineer(Werkstudent) in Netzlab GmbH',
    'Driven web programmer with more than 2 year''s experience in Asp.Net, Asp.Net Core web API & C#. Also worked as both front and back end developer.'
  ],
  'Essen',
  'Germany',
  '45141'
);

-- profiles
INSERT INTO profiles (network, username, url, sort_order)
VALUES (
  'github',
  'Tazbirul94',
  'https://github.com/tazbirul94',
  0
);

-- work
INSERT INTO work (company, website, position, start_date, end_date, summary, highlights, sort_order)
VALUES
(
  'Netzlab GmbH',
  'https://netzlab.de/',
  'Software Engineer (Working Student)',
  '2020-10-01',
  NULL,
  '<C#, Asp.Net Core Web API, React Native, React, Javascript, CSS, Git, Azure>',
  ARRAY[
    'Developing and maintaining application using React Native, C#, Asp.Net Core, ReactJS, MS SQL, jQuery.',
    'Web API, REST API, MS SQL Server, LINQ, Version Controlling with Azure.',
    'Working with a team with responsibilities maintaining Agile Software Development(SCRUM).'
  ],
  0
),
(
  'Convince Computer Limited',
  'https://www.convincebd.com/',
  'Programmer (Full-Time)',
  '2017-09-15',
  '2019-09-15',
  '<C#, Asp.Net MVC, Javascript, Html 5, CSS3, Github>',
  ARRAY[
    'Implemented business logics using ASP.Net MVC, C# and designed management websites.',
    'Worked and manipulated large amount of data using MS SQL.',
    'Gathered information from clients and implemented them and Version controlled with Github.'
  ],
  1
),
(
  'China Railway Major Bridge Engineering Co., Ltd.',
  'http://www.crecg.com/english/2687/3808/3938/index.html',
  'IT Engineer (Full-Time)',
  '2017-05-15',
  '2017-08-15',
  '',
  ARRAY[
    'Maintained and monitored the internal servers and other relevant devices.',
    'Solved the major issues the local network system.'
  ],
  2
);

-- education
INSERT INTO education (institution, area, start_date, end_date, gpa, gpa_german, summary, courses, sort_order)
VALUES
(
  'Hochschule Rhein-Waal',
  'Master in Information Engineering and Computer Science',
  '2020-03-01',
  NULL,
  '<GRADE_POINT_AVERAGE>',
  NULL,
  '<SUMMARY>',
  ARRAY['<COURSE_1>', '<COURSE_2>', '<COURSE_3>'],
  0
),
(
  'Ahsanullah University of Science and Technology',
  'Bacholer in Computer Science and Engineering',
  '2013-03-01',
  '2017-03-01',
  '3.34',
  '2.1',
  '<SUMMARY>',
  ARRAY['<COURSE_1>', '<COURSE_2>', '<COURSE_3>'],
  1
),
(
  'SOS Hermann Gmeiner College',
  'Higher Seconday Certificate',
  '2010-06-01',
  '2012-06-01',
  '5',
  '1',
  '<SUMMARY>',
  ARRAY['<COURSE_1>', '<COURSE_2>', '<COURSE_3>'],
  2
);

-- skill_groups (example placeholder from template)
-- The example file uses placeholder values; inserting one representative group
INSERT INTO skill_groups (id, title, description, type, sort_order)
VALUES
(
  gen_random_uuid(),
  '<DESCRIPTION_TITLE>',
  ARRAY['<DESCRIPTION_1>', '<DESCRIPTION_2>', '<DESCRIPTION_3>'],
  'hard',
  0
);

-- skills tied to the group above
-- Using a CTE so we can reference the inserted group id
WITH inserted_group AS (
  SELECT id FROM skill_groups WHERE title = '<DESCRIPTION_TITLE>' LIMIT 1
)
INSERT INTO skills (group_id, name, level, sort_order)
SELECT inserted_group.id, '<SKILL_NAME>', NULL, 0
FROM inserted_group;

-- languages (placeholder)
INSERT INTO languages (name, level, sort_order)
VALUES ('<LANGUAGE_NAME>', '<LANGUAGE_LEVEL>', 0);

-- interests (placeholder)
INSERT INTO interests (name, keywords, sort_order)
VALUES ('<INTEREST_NAME>', ARRAY['<KEYWORD_1>', '<KEYWORD_2>', '<KEYWORD_3>'], 0);

-- projects (placeholder)
INSERT INTO projects (name, website, category, publisher, keywords, sort_order)
VALUES (
  '<PUBLICATION_NAME>',
  '<WEBSITE>',
  '<CATEGORY>',
  '<PUBLISHER>',
  ARRAY['<KEYWORD_1>', '<KEYWORD_2>', '<KEYWORD_3>'],
  0
);

-- testimonials (placeholder)
INSERT INTO testimonials (name, position, company, reference, sort_order)
VALUES ('<REFERENCE_NAME>', '<POSITION>', '<COMPANY>', '<SUMMARY>', 0);
