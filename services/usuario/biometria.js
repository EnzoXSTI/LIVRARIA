import * as LocalAuthentication from 'expo-local-authentication';

export async function getBiometria() {
    // Verifica se o aparelho possui biometria
    const possuiBiometria = await LocalAuthentication.hasHardwareAsync();

    if (!possuiBiometria) {
        console.log('Não possui biometria');
        return false
    }

    // Verifica se existe biometria cadastrada
    const biometriaCadastrada = await LocalAuthentication.isEnrolledAsync();

    if (!biometriaCadastrada) {
        console.log("Não possui biometria cadastrada");
        return false
    }

    // Solicita a autenticação
    const resultado = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Confirme sua identidade',
        cancelLabel: 'Cancelar',
    });

    if (resultado.success) {
        console.log('Biometria validada com sucesso!');
        return true
    }

    console.log("Biometria incorreta");
    return false
}