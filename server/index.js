require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/userAccount/:userId', (req, res, next) => {
  const { userId } = req.params;
  const params = [userId];

  if (userId <= 0) {
    return res.status(400).json({
      error: 'userId entered is invalid.'
    });
  } else {
    db.query(db.queries.getUser, params)
      .then(result => {
        if (!result.rows[0]) {
          next(new ClientError(`Cannot find family with userId ${userId}`, 500));
        } else {
          res.status(200).json(result.rows[0]);
        }
      })
      .catch(err => {
        next(err);
      });
  }
});

app.get('/api/familyLibrary/', (req, res, next) => {
  db.query(db.queries.getAllFamilies)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
});

app.get('/api/familyLibrary/:familyId', (req, res, next) => {
  const { familyId } = req.params;
  const params = [familyId];

  if (familyId <= 0) {
    return res.status(400).json({
      error: 'ProfileId entered is invalid.'
    });
  } else {
    db.query(db.queries.getFamily, params)
      .then(result => {
        if (!result.rows[0]) {
          next(new ClientError(`Cannot find family with familyId ${familyId}`, 500));
        } else {
          res.status(200).json(result.rows[0]);
        }
      })
      .catch(err => {
        next(err);
      });
  }
});

app.get('/api/treeLibrary/', (req, res, next) => {
  db.query(db.queries.getAllTrees)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
});

app.get('/api/treeLibrary/:treeId', (req, res, next) => {
  const { treeId } = req.params;
  const params = [treeId];

  if (treeId <= 0) {
    return res.status(400).json({
      error: 'ProfileId entered is invalid.'
    });
  } else {
    db.query(db.queries.getTree, params)
      .then(result => {
        if (!result.rows[0]) {
          next(new ClientError(`Cannot find tree with treeId ${treeId}`, 500));
        } else {
          res.status(200).json(result.rows[0]);
        }
      })
      .catch(err => {
        next(err);
      });
  }
});

app.get('/api/profiles/', (req, res, next) => {
  db.query(db.queries.getAllProfiles)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
});

app.get('/api/profiles/:profileId', (req, res, next) => {
  const { profileId } = req.params;
  const params = [profileId];

  if (profileId <= 0) {
    return res.status(400).json({
      error: 'ProfileId entered is invalid.'
    });
  } else {
    db.query(db.queries.getProfile, params)
      .then(result => {
        if (!result.rows[0]) {
          next(new ClientError(`Cannot find profile with profileId ${profileId}`, 500));
        } else {
          res.status(200).json(result.rows[0]);
        }
      })
      .catch(err => {
        next(err);
      });
  }
});

app.post('/api/userAccount/', (req, res) => {
  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.password
  ];
  db.query(db.queries.postAccount, values)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
});

app.post('/api/familyLibrary/', (req, res) => {
  const values = [
    parseInt(req.body.userId),
    req.body.name
  ];
  db.query(db.queries.postFamily, values)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
});

app.post('/api/treeLibrary/', (req, res) => {
  const values = [
    parseInt(req.body.userId),
    req.body.name
  ];
  db.query(db.queries.postTree, values)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
});

app.post('/api/profiles/', (req, res) => {
  const values = [
    parseInt(req.body.familyId),
    parseInt(req.body.treeId),
    req.body.firstName,
    req.body.lastName,
    parseInt(req.body.age),
    req.body.birthMonth,
    parseInt(req.body.birthYear),
    req.body.gender,
    req.body.deceased,
    req.body.birthPlace,
    req.body.phoneNumber,
    req.body.email,
    req.body.image
  ];
  db.query(db.queries.postProfile, values)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
});

app.put('/api/userAccount/:userId?', (req, res, next) => {
  const { userId } = req.params;
  const params = [
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.password,
    userId
  ];
  db.query(db.queries.updateAccount, params)
    .then(result => {
      if (!result.rows[0]) {
        res.status(404).json({
          error: `Cannot find user with "userId" ${userId}`
        });
      } else {
        res.status(200).json(result.rows[0]);
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
});

app.put('/api/familyLibrary/:familyId?', (req, res, next) => {
  const { familyId } = req.params;
  const params = [
    parseInt(req.body.userId),
    req.body.name,
    familyId
  ];
  db.query(db.queries.updateFamily, params)
    .then(result => {
      if (!result.rows[0]) {
        res.status(404).json({
          error: `Cannot find family with "familyId" ${familyId}`
        });
      } else {
        res.status(200).json(result.rows[0]);
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
});

app.put('/api/treeLibrary/:treeId?', (req, res, next) => {
  const { treeId } = req.params;
  const params = [
    parseInt(req.body.userId),
    req.body.name,
    treeId
  ];
  db.query(db.queries.updateTree, params)
    .then(result => {
      if (!result.rows[0]) {
        res.status(404).json({
          error: `Cannot find tree with "treeId" ${treeId}`
        });
      } else {
        res.status(200).json(result.rows[0]);
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
});

app.patch('/api/profiles/:profileId?', (req, res, next) => {
  const { profileId } = req.params;
  const params = [
    parseInt(req.body.familyId),
    parseInt(req.body.treeId),
    req.body.firstName,
    req.body.lastName,
    parseInt(req.body.age),
    req.body.birthMonth,
    parseInt(req.body.birthYear),
    req.body.gender,
    req.body.deceased,
    req.body.birthPlace,
    req.body.phoneNumber,
    req.body.email,
    req.body.image,
    profileId
  ];
  db.query(db.queries.updateProfile, params)
    .then(result => {
      if (!result.rows[0]) {
        res.status(404).json({
          error: `Cannot find profile with "profileId" ${profileId}`
        });
      } else {
        res.status(200).json(result.rows[0]);
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
});

app.delete('/api/userAccount/:userId', (req, res, next) => {
  const { userId } = req.params;
  const params = [userId];
  db.query(db.queries.deleteAccount, params)
    .then(result => {
      if (!result.rows[0]) {
        res.status(404).json({
          error: `Cannot find user with "userId" ${userId}`
        });
      } else {
        res.status(200).json({ message: `User ${userId} has been deleted` });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.delete('/api/familyLibrary/:familyId', (req, res, next) => {
  const { familyId } = req.params;
  const params = [familyId];
  db.query(db.queries.deleteFamily, params)
    .then(result => {
      if (!result.rows[0]) {
        res.status(404).json({
          error: `Cannot find family with "familyId" ${familyId}`
        });
      } else {
        res.status(200).json({ message: `Family ${familyId} has been deleted` });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.delete('/api/treeLibrary/:treeId', (req, res, next) => {
  const { treeId } = req.params;
  const params = [treeId];
  db.query(db.queries.deleteTree, params)
    .then(result => {
      if (!result.rows[0]) {
        res.status(404).json({
          error: `Cannot find tree with "treeId" ${treeId}`
        });
      } else {
        res.status(200).json({ message: `Tree ${treeId} has been deleted` });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.delete('/api/profiles/:profileId', (req, res, next) => {
  const { profileId } = req.params;
  const params = [profileId];
  db.query(db.queries.deleteProfile, params)
    .then(result => {
      if (!result.rows[0]) {
        res.status(404).json({
          error: `Cannot find profile with "profile" ${profileId}`
        });
      } else {
        res.status(200).json({ message: `Profile ${profileId} has been deleted` });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: err.message
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
