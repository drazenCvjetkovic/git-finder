import React, { useEffect, useContext, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import { Link } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

const User = ({ match }) => {
  const githubContext = useContext(GithubContext);
  const { getUser, loading, user, repos, getUserRepos } = githubContext;

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    //eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    company,
    hireable,
  } = user;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <Link to='/' className='btn btn-light'>
          Back to serach
        </Link>
        Hireable:{' '}
        {hireable ? (
          <i className='fa fa-check text-success' />
        ) : (
          <i className='fa fa-times-circle text-danger' />
        )}
        <div className='card grid-2'>
          <div className='all-center'>
            <img
              src={avatar_url}
              className='round-img'
              alt='avatar'
              style={{ width: '150px' }}
            />
            <h1>{name}</h1>
            <p>Locaion:{location}</p>
          </div>
          <div>
            {bio && (
              <Fragment>
                <h3>Bio:</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a href={html_url} className='btn btn-dark my-1'>
              Visit github profile
            </a>
            <ul>
              <li>
                <Fragment>
                  <strong>Username:</strong>
                  {login}
                </Fragment>
              </li>
              <li>
                {company && (
                  <Fragment>
                    <strong>Company:</strong>
                    {company}
                  </Fragment>
                )}
              </li>
              <li>
                {blog && (
                  <Fragment>
                    <strong>Website:</strong>
                    {blog}
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className='card text-center'>
          <div className='badge badge-primary'>Folowers:{followers}</div>
          <div className='badge badge-success'>Folowng:{following}</div>
          <div className='badge badge-light'>Public Repos:{public_repos}</div>
          <div className='badge badge-dark'>Public Gists:{public_gists}</div>
        </div>
        <Repos repos={repos} />
      </Fragment>
    );
  }
};

export default User;
