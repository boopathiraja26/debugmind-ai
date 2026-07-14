import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiTerminal, FiArrowRight } from 'react-icons/fi';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import useAuth from '../hooks/useAuth';
import { validateRegisterForm } from '../utils/validators';
import { ROUTES } from '../utils/constants';

const INITIAL_FORM = { name: '', email: '', password: '', confirmPassword: '' };

const Register = () => {
  const { register, isSubmitting } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateRegisterForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await register({ name: form.name, email: form.email, password: form.password });
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (err) {
      // Error toast is already handled inside AuthContext.
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-grid-fade px-5 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-400/10 text-brand-400">
            <FiTerminal size={20} />
          </span>
          <h1 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink">
            Create your account
          </h1>
          <p className="mt-1.5 text-sm text-ink-muted">
            Start analyzing bugs with AI in under a minute.
          </p>
        </div>

        <Card className="p-7 sm:p-8">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <Input
              id="name"
              name="name"
              type="text"
              label="Full name"
              placeholder="Ada Lovelace"
              icon={<FiUser size={16} />}
              value={form.name}
              onChange={handleChange}
              error={errors.name}
              autoComplete="name"
            />

            <Input
              id="email"
              name="email"
              type="email"
              label="Email address"
              placeholder="you@company.com"
              icon={<FiMail size={16} />}
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              autoComplete="email"
            />

            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="At least 6 characters"
              icon={<FiLock size={16} />}
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              autoComplete="new-password"
            />

            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm password"
              placeholder="Re-enter your password"
              icon={<FiLock size={16} />}
              value={form.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              autoComplete="new-password"
            />

            <Button
              type="submit"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
              rightIcon={!isSubmitting ? <FiArrowRight size={16} /> : null}
            >
              Create account
            </Button>
          </form>
        </Card>

        <p className="mt-6 text-center text-sm text-ink-muted">
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="font-medium text-brand-400 hover:text-brand-300">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
