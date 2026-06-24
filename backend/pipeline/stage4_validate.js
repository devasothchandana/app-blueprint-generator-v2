function validateAndRepair(intent, design, schemas) {
  const errors = [];
  const repairs = [];

  // ── 1. Validate intent ──────────────────────────
  if (!intent.appName) {
    errors.push('Missing appName');
    intent.appName = 'Untitled App';
    repairs.push('Added default appName');
  }
  if (!intent.features || intent.features.length === 0) {
    errors.push('Missing features');
    intent.features = ['dashboard'];
    repairs.push('Added default feature: dashboard');
  }
  if (!intent.roles || intent.roles.length === 0) {
    errors.push('Missing roles');
    intent.roles = ['user'];
    repairs.push('Added default role: user');
  }

  // ── 2. Validate design ──────────────────────────
  if (!design.pages || design.pages.length === 0) {
    errors.push('Missing pages in design');
    design.pages = ['Dashboard'];
    repairs.push('Added default page: Dashboard');
  }
  if (!design.dbTables || design.dbTables.length === 0) {
    errors.push('Missing DB tables');
    design.dbTables = [{ name: 'users', fields: ['id', 'email', 'password'] }];
    repairs.push('Added default users table');
  }

  // ── 3. Validate schemas ─────────────────────────
  if (!schemas.uiSchema || !schemas.uiSchema.pages) {
    errors.push('Missing uiSchema');
    schemas.uiSchema = { pages: [] };
    repairs.push('Added empty uiSchema');
  }
  if (!schemas.apiSchema || !schemas.apiSchema.endpoints) {
    errors.push('Missing apiSchema');
    schemas.apiSchema = { endpoints: [] };
    repairs.push('Added empty apiSchema');
  }
  if (!schemas.dbSchema || !schemas.dbSchema.tables) {
    errors.push('Missing dbSchema');
    schemas.dbSchema = { tables: [] };
    repairs.push('Added empty dbSchema');
  }
  if (!schemas.authSchema) {
    errors.push('Missing authSchema');
    schemas.authSchema = { type: 'JWT', roles: intent.roles, permissions: {} };
    repairs.push('Added default authSchema');
  }

  // ── 4. Cross-layer consistency check ───────────
  // Check API endpoints match DB tables
  const dbTableNames = schemas.dbSchema.tables.map(t => t.name.toLowerCase());
  const apiPaths = schemas.apiSchema.endpoints.map(e => e.path);

  if (intent.hasAuth && !apiPaths.some(p => p.includes('auth') || p.includes('login'))) {
    errors.push('Auth required but no auth endpoint found');
    schemas.apiSchema.endpoints.push({
      method: 'POST',
      path: '/api/auth/login',
      body: ['email', 'password'],
      response: ['token', 'user'],
      auth: false
    });
    repairs.push('Added missing auth endpoint');
  }

  if (!dbTableNames.includes('users') && intent.hasAuth) {
    errors.push('Auth required but no users table found');
    schemas.dbSchema.tables.push({
      name: 'users',
      fields: [
        { name: 'id', type: 'UUID', primary: true },
        { name: 'email', type: 'VARCHAR', unique: true },
        { name: 'password', type: 'VARCHAR' },
        { name: 'role', type: 'VARCHAR' }
      ]
    });
    repairs.push('Added missing users table');
  }

  return {
    isValid: errors.length === 0,
    errors,
    repairs,
    repairedIntent: intent,
    repairedDesign: design,
    repairedSchemas: schemas
  };
}

module.exports = { validateAndRepair };