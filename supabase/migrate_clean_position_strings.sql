-- Strip employment type suffixes from position column; employment_type column is already correct.
UPDATE work SET position = 'Full Stack Developer'  WHERE position = 'Full Stack Developer (Working Student)';
UPDATE work SET position = 'Software Engineer'     WHERE position = 'Software Engineer (Working Student)';
UPDATE work SET position = 'IT Engineer'           WHERE position = 'IT Engineer (Full-Time)';
UPDATE work SET position = 'Programmer'            WHERE position = 'Programmer (Full-Time)';
